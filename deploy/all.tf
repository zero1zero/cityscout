/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

# External HTTP load balancer with an CDN-enabled managed instance group backend

module "api-container" {
  source  = "terraform-google-modules/container-vm/google"
  version = "~> 2.0"

  container = {
    image="us-west3-docker.pkg.dev/cityscout-390219/api/${var.image-version}"
    securityContext = {
      privileged : true
    }
    tty : true
  }

  restart_policy = "Always"
}

resource "google_compute_instance_template" "api" {
  project = "cityscout-390219"
  name_prefix = "api-instance-template"
  lifecycle {
    create_before_destroy = true
  }

  metadata = {
    google-logging-enabled = true
    gce-container-declaration = module.api-container.metadata_value
  }
  labels = {
    container-vm = module.api-container.vm_container_label
    managed-by-cnrm = "true"
  }

  disk {
    auto_delete  = true
    boot         = true
    device_name  = "persistent-disk-1"
    mode         = "READ_WRITE"
    #    source_image = "projects/debian-cloud/global/images/family/debian-11"
    source_image = data.google_compute_image.gce_container_vm_image.self_link
    type         = "PERSISTENT"
    disk_size_gb      = 10
  }
  machine_type = "n1-standard-1"
  network_interface {
    access_config {
      network_tier = "PREMIUM"
    }
    network    = "global/networks/default"
    subnetwork = "regions/us-west3/subnetworks/default"
    subnetwork_project = "cityscout-390219"
  }
  region = "us-west3"
  scheduling {
    preemptible = true
    automatic_restart = false
    on_host_maintenance = "TERMINATE"
    provisioning_model  = "SPOT"
  }
  service_account {
    email  = "default"
    scopes = ["https://www.googleapis.com/auth/devstorage.read_only",
      "https://www.googleapis.com/auth/cloud-platform", #all hack to get artifact
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring.write",
      "https://www.googleapis.com/auth/pubsub",
      "https://www.googleapis.com/auth/service.management.readonly",
      "https://www.googleapis.com/auth/servicecontrol",
      "https://www.googleapis.com/auth/trace.append"]
  }
  tags = ["allow-health-check"]
}

module "web-container" {
  source  = "terraform-google-modules/container-vm/google"
  version = "~> 2.0"

  container = {
    image="us-west3-docker.pkg.dev/cityscout-390219/web/${var.image-version}"
    securityContext = {
      privileged : true
    }
    tty : true
  }

  restart_policy = "Always"
}

data "google_compute_image" "gce_container_vm_image" {
  family  = "cos-stable"
  project = "cos-cloud"
}

resource "google_compute_instance_template" "web" {
  project = "cityscout-390219"
  name_prefix = "web-instance-template"
  lifecycle {
    create_before_destroy = true
  }

  metadata = {
    google-logging-enabled = true
    gce-container-declaration = module.web-container.metadata_value
  }
  labels = {
    container-vm = module.web-container.vm_container_label
    managed-by-cnrm = "true"
  }

  disk {
    auto_delete  = true
    boot         = true
    device_name  = "persistent-disk-1"
    mode         = "READ_WRITE"
#    source_image = "projects/debian-cloud/global/images/family/debian-11"
    source_image = data.google_compute_image.gce_container_vm_image.self_link
    type         = "PERSISTENT"
    disk_size_gb      = 10
  }
  machine_type = "n1-standard-1"
  network_interface {
    access_config {
      network_tier = "PREMIUM"
    }
    network    = "global/networks/default"
    subnetwork = "regions/us-west3/subnetworks/default"
    subnetwork_project = "cityscout-390219"
  }
  region = "us-west3"
  scheduling {
    preemptible = true
    automatic_restart = false
    on_host_maintenance = "TERMINATE"
    provisioning_model  = "SPOT"
  }
  service_account {
    email  = "default"
    scopes = ["https://www.googleapis.com/auth/devstorage.read_only",
      "https://www.googleapis.com/auth/cloud-platform", #all hack to get artifact
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring.write",
      "https://www.googleapis.com/auth/pubsub",
      "https://www.googleapis.com/auth/service.management.readonly",
      "https://www.googleapis.com/auth/servicecontrol",
      "https://www.googleapis.com/auth/trace.append"]
  }
  tags = ["allow-health-check"]
}


# [START cloudloadbalancing_ext_http_gce_instance_mig]
resource "google_compute_region_instance_group_manager" "api" {
  project = "cityscout-390219"
  name = "api-group-manager"
  region = "us-west3"
  named_port {
    name = "http"
    port = 8080
  }
  version {
    instance_template = google_compute_instance_template.api.id
    name              = "primary"
  }
  base_instance_name = "vm"
}

resource "google_compute_region_instance_group_manager" "web" {
  project = "cityscout-390219"
  name = "web-group-manager"
  region = "us-west3"
  named_port {
    name = "http"
    port = 3000
  }
  version {
    instance_template = google_compute_instance_template.web.id
    name              = "primary"
  }
  base_instance_name = "vm"
}


## [START cloudloadbalancing_ext_http_gce_instance_firewall_rule]
resource "google_compute_firewall" "default" {
  project = "cityscout-390219"
  name          = "fw-allow-health-check"
  direction     = "INGRESS"
  network       = "global/networks/default"
  priority      = 1000
#  source_ranges = ["130.211.0.0/22", "35.191.0.0/16"]
    source_ranges = ["0.0.0.0/0"]
  target_tags   = ["allow-health-check"]
  allow {
    ports    = ["3000", "8080"]
    protocol = "tcp"
  }
}
## [END cloudloadbalancing_ext_http_gce_instance_firewall_rule]

# [START cloudloadbalancing_ext_http_gce_instance_ip_address]
resource "google_compute_global_address" "default" {
  project = "cityscout-390219"
  name       = "lb-ipv4-1"
  ip_version = "IPV4"
  address = "34.160.105.234"
}

resource "google_compute_health_check" "web" {
  project = "cityscout-390219"
  name               = "http-basic-check-web"
  check_interval_sec = 5
  healthy_threshold  = 2
  http_health_check {
    port               = 3000
    port_specification = "USE_FIXED_PORT"
    proxy_header       = "NONE"
    request_path       = "/"
  }
  timeout_sec         = 5
  unhealthy_threshold = 2
}

resource "google_compute_health_check" "api" {
  project = "cityscout-390219"
  name               = "http-basic-check-api"
  check_interval_sec = 5
  healthy_threshold  = 2
  http_health_check {
    port               = 8080
    port_specification = "USE_FIXED_PORT"
    proxy_header       = "NONE"
    request_path       = "/"
  }
  timeout_sec         = 5
  unhealthy_threshold = 2
}

resource "google_compute_backend_service" "api" {
  project = "cityscout-390219"
  name                            = "backend-service-api"
  connection_draining_timeout_sec = 0
  health_checks                   = [google_compute_health_check.api.id]
  load_balancing_scheme           = "EXTERNAL_MANAGED"
  port_name                       = "http"
  protocol                        = "HTTP"
  session_affinity                = "NONE"
  timeout_sec                     = 30
  backend {
    group           = google_compute_region_instance_group_manager.api.instance_group
    balancing_mode  = "UTILIZATION"
    capacity_scaler = 1.0
  }
}

resource "google_compute_region_autoscaler" "web" {
  project = "cityscout-390219"
  name   = "web-autoscaler"
  region = "us-west3"
  target = google_compute_region_instance_group_manager.web.id

  autoscaling_policy {
    max_replicas    = 5
    min_replicas    = 1
    cooldown_period = 60

    cpu_utilization {
      target = 0.8
    }
  }
}

resource "google_compute_region_autoscaler" "api" {
  project = "cityscout-390219"
  name   = "api-autoscaler"
  region = "us-west3"
  target = google_compute_region_instance_group_manager.api.id

  autoscaling_policy {
    max_replicas    = 5
    min_replicas    = 1
    cooldown_period = 60

    cpu_utilization {
      target = 0.8
    }
  }
}

resource "google_compute_backend_service" "web" {
  project = "cityscout-390219"
  name                            = "backend-service-web"
  connection_draining_timeout_sec = 0
  health_checks                   = [google_compute_health_check.web.id]
  load_balancing_scheme           = "EXTERNAL_MANAGED"
  port_name                       = "http"
  protocol                        = "HTTP"
  session_affinity                = "NONE"
  timeout_sec                     = 30
  backend {
    group           = google_compute_region_instance_group_manager.web.instance_group
    balancing_mode  = "UTILIZATION"
    capacity_scaler = 1.0
  }
#  enable_cdn  = true
#  cdn_policy {
#    cache_mode = "CACHE_ALL_STATIC"
#    default_ttl = 3600
#    client_ttl  = 7200
#    max_ttl     = 10800
#    negative_caching = true
#    signed_url_cache_max_age_sec = 7200
#  }
}
# [END cloudloadbalancing_ext_http_gce_instance_backend_service]

# [START cloudloadbalancing_ext_http_gce_instance_url_map]
resource "google_compute_url_map" "default" {
  project = "cityscout-390219"
  name            = "http-url-map"
#  default_service = google_compute_backend_service.web.id
  lifecycle {
    create_before_destroy = true
  }

  host_rule {
    hosts        = ["*"]
    path_matcher = "all"
  }

  default_url_redirect {
        https_redirect = true
    path_redirect = "/"
    strip_query = false
  }

  path_matcher {
    name            = "all"
    default_service = google_compute_backend_service.web.id

    path_rule {
      paths = [
        "/api/*",
      ]
      service = google_compute_backend_service.api.id
    }
  }
}
#
#terraform {
#  required_providers {
#    acme = {
#      source  = "vancluever/acme"
#      version = "~> 2.0"
#    }
#  }
#}

#access token
#TXFISC02UE1pS1RrWEhSN2RaVjFmdw==

#hmac
#468e01c3bf4f1f29e88d86069d3f9aad
#2TsCwc6UNIL_7PfDC__82DLK7l3gX61qAFl2IPCQXM0o1khQRWlvv-LS0sY42yV5Bn9ZLbxmKnM7TtaZWEDoVQ

#
#resource "google_certificate_manager_dns_authorization" "default" {
#  project = "cityscout-390219"
#  name        = "dns-auth"
#  description = "The default dns auth"
#  domain      = "cityscout.app"
#  labels = {
#    "terraform" : true
#  }
#}
#
#resource "google_certificate_manager_certificate" "default" {
#  project = "cityscout-390219"
#  name        = "cityscout"
#  lifecycle {
#    create_before_destroy = true
#  }
#  managed {
#    domains = ["cityscout.app"]
#    dns_authorizations = [
#      google_certificate_manager_dns_authorization.default.id
#    ]
#  }
#  labels = {
#    "terraform" : true
#  }
#}
#
#resource "google_certificate_manager_certificate" "default" {
#  project = "cityscout-390219"
#  name        = "test-cert"
#  description = "Google-managed cert"
#  managed {
#    domains = ["cityscout.app"]
#  }
#  labels = {
#    "terraform" : true
#  }
#}

resource "google_compute_managed_ssl_certificate" "cityscout_managed_certificate" {
  project = "cityscout-390219"
  provider = google
  name = "cityscout"
  managed {
    domains = ["cityscout.app"]
  }
}

resource "google_compute_target_https_proxy" "default" {
  project = "cityscout-390219"
  name             = "https-proxy"
  url_map = google_compute_url_map.default.id
  ssl_certificates = [google_compute_managed_ssl_certificate.cityscout_managed_certificate.self_link]
}


resource "google_compute_global_forwarding_rule" "default" {
  project = "cityscout-390219"
  name                  = "http-content-rule"
  ip_protocol           = "TCP"
  load_balancing_scheme = "EXTERNAL_MANAGED"
  port_range            = "443"
  target                = google_compute_target_https_proxy.default.id
  ip_address            = google_compute_global_address.default.id
}

resource "google_artifact_registry_repository" "api" {
  project = "cityscout-390219"
  location      = "us-west3"
  repository_id = "api"
  format        = "DOCKER"

  docker_config {
    immutable_tags = false
  }
}

resource "google_artifact_registry_repository" "web" {
  project = "cityscout-390219"
  location      = "us-west3"
  repository_id = "web"
  format        = "DOCKER"

  docker_config {
    immutable_tags = false
  }
}

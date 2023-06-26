VERSION=$(shell cat release.version | awk -F. -v OFS=. '{$$NF += 1 ; print}')

release:
	cd ../web; yarn run next build
	cd ../web; docker build --push --platform linux/amd64 . -t us-west3-docker.pkg.dev/cityscout-390219/web/$(VERSION)

	cd ../api; ./gradlew shadowJar
	cd ../api; docker build --push --platform linux/amd64 . -t us-west3-docker.pkg.dev/cityscout-390219/api/$(VERSION)

	terraform apply -auto-approve -var="image-version=$(VERSION)"
	#gcloud compute instance-groups managed rolling-action restart --project cityscout-390219 --region us-west3 web-group-manager

	echo "$(VERSION)" > release.version

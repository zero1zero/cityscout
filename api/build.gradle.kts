import net.pwall.json.schema.codegen.CodeGenerator
import net.pwall.json.schema.codegen.TargetLanguage

val ktor_version: String by project
val kotlin_version: String by project
val logback_version: String by project
val exposed_version: String by project
val h2_version: String by project
val ktorm_version: String by project

buildscript {
    repositories {
        mavenCentral()
    }
    dependencies {
        classpath("net.pwall.json:json-kotlin-schema-codegen:0.90")
    }
}


plugins {
    kotlin("jvm") version "1.8.21"
    id("io.ktor.plugin") version "2.3.0"
    id("org.jetbrains.kotlin.plugin.serialization") version "1.8.21"
}

group = "app.cityscout"
version = "0.0.1"
application {
    mainClass.set("app.cityscout.ApplicationKt")

    val isDevelopment: Boolean = project.ext.has("development")
    applicationDefaultJvmArgs = listOf("-Dio.ktor.development=$isDevelopment")
}

repositories {
    mavenCentral()
}
kotlin {
    jvmToolchain(17)
}

tasks.named<Test>("test") {
    useJUnitPlatform()
}

dependencies {
    implementation("io.ktor:ktor-server-cors-jvm:$ktor_version")
    implementation("io.ktor:ktor-server-core-jvm:$ktor_version")
//    implementation("io.ktor:ktor-serialization-kotlinx-json-jvm:$ktor_version")
    implementation("io.ktor:ktor-serialization-gson:$ktor_version")
    implementation("io.ktor:ktor-server-content-negotiation-jvm:$ktor_version")
    implementation("org.jetbrains.exposed:exposed-core:$exposed_version")
    implementation("org.jetbrains.exposed:exposed-jdbc:$exposed_version")
    implementation("com.h2database:h2:$h2_version")
    implementation("io.ktor:ktor-server-metrics-jvm:$ktor_version")
    implementation("io.ktor:ktor-server-call-logging-jvm:$ktor_version")
    implementation("io.ktor:ktor-server-conditional-headers-jvm:$ktor_version")
    implementation("io.ktor:ktor-server-compression-jvm:$ktor_version")
    implementation("io.ktor:ktor-server-caching-headers-jvm:$ktor_version")
    implementation("io.ktor:ktor-server-resources:$ktor_version")
    implementation("io.ktor:ktor-server-host-common-jvm:$ktor_version")
    implementation("io.ktor:ktor-server-auto-head-response-jvm:$ktor_version")
    implementation("io.ktor:ktor-server-auth-jvm:$ktor_version")
    implementation("io.ktor:ktor-server-auth-jwt-jvm:$ktor_version")
    implementation("io.ktor:ktor-server-netty-jvm:$ktor_version")
    implementation("ch.qos.logback:logback-classic:$logback_version")


    implementation("com.aallam.openai:openai-client:3.2.3")
    implementation("io.ktor:ktor-client-cio:$ktor_version")
    implementation("io.ktor:ktor-client-content-negotiation:$kotlin_version")
    implementation("it.skrape:skrapeit:1.1.5")

    //db stuff
    implementation("org.ktorm:ktorm-support-sqlite:${ktorm_version}")
    implementation("org.ktorm:ktorm-core:${ktorm_version}")
    implementation("org.xerial:sqlite-jdbc:3.42.0.0")


    testImplementation("org.junit.jupiter:junit-jupiter-engine:5.9.3")
    testImplementation("org.junit.jupiter:junit-jupiter-params:5.9.3")
    testImplementation("io.ktor:ktor-server-tests-jvm:$ktor_version")
    testImplementation("org.jetbrains.kotlin:kotlin-test-junit:$kotlin_version")
}

val codegen by tasks.registering {
    doLast {
        val tsGen = CodeGenerator(TargetLanguage.TYPESCRIPT)
        tsGen.baseDirectoryName = "../web/src/model"
        tsGen.generate(File("src/main/resources/schema/"))

        val ktGen = CodeGenerator(TargetLanguage.KOTLIN)
//        ktGen.addClassAnnotation("kotlinx.serialization.Serializable")
        ktGen.addClassAnnotation("javax.annotation.processing.Generated")
        ktGen.baseDirectoryName = "src/main/kotlin"
        ktGen.basePackageName = "app.cityscout.model"
        ktGen.generate(File("src/main/resources/schema/"))

        println("Model generation complete")
    }
}

tasks.assemble.get().dependsOn(codegen)


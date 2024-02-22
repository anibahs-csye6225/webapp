packer {
  required_plugins {
    googlecompute = {
      source  = "github.com/hashicorp/googlecompute"
      version = "~> 1"
    }
  }
}

source "googlecompute" "custom-image" {
  #credentials_file    = var.cred_path
  image_name          = var.image_name
  project_id          = var.project_id
  source_image_family = var.source_image_family
  zone                = var.zone
  ssh_username        = var.ssh_username

  # machine_type        = "e2-micro"
  # use_os_login = "false"
  # image_family      = var.image_family
  # image_description = "Consul base image"
}

build {
  name = "builder"
  source "sources.googlecompute.custom-image" {
    name = "custom-image"
  }

  # provisioner "file" {
  #   source      = "./../.env"
  #   destination = "/tmp/.env"
  # }

  provisioner "shell" {
    scripts = [
      "db_init.sh"
    ]
  }


  # webapp.zip is needed to run cp_app.sh
  #-------------------------------------# 
  provisioner "file" {
    source      = "./../../webapp.zip"
    destination = "/tmp/webapp.zip"
  }
  #-------------------------------------# 
  provisioner "shell" {
    scripts = [
      "env_init.sh"
    ]
  }
  #-------------------------------------# 


  provisioner "shell" {
    scripts = [
      "setup_service.sh"
    ]
  }







}
  


# source "google_compute_image" "custom_image" {
#   name         = "custom-image"
#   project      = var.gcp_project_id
#   family       = "custom-image-family"
#   source_image = "projects/centos-cloud/global/images/family/${var.gcp_source_image_family}"
# }

# source "google_compute_instance" "packer_builder" {
#   name         = "packer-builder-instance"
#   machine_type = "n1-standard-1"
#   zone         = var.gcp_zone
#   project      = var.gcp_project_id

#   boot_disk {
#     initialize_params {
#       image = google_compute_image.custom_image.self_link
#     }
#   }

#   network_interface {
#     network = "default"
#   }


# }

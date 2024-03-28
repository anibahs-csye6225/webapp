packer {
  required_plugins {
    googlecompute = {
      source  = "github.com/hashicorp/googlecompute"
      version = "~> 1"
    }
  }
}

source "googlecompute" "custom-image" {
  image_name          = var.image_name
  project_id          = var.project_id
  source_image_family = var.source_image_family
  zone                = var.zone
  ssh_username        = var.ssh_username
}

build {
  name = "builder"
  source "sources.googlecompute.custom-image" {
    name = "custom-image"
  }

  # move db setup to CLoud SQL 
  # provisioner "shell" {
  #   scripts = [
  #     "db_init.sh"
  #   ]
  # }


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


  # provisioner "shell" {
  #   scripts = [
  #     "setup_service.sh"
  #   ]
  # }

  #-------------------------------------# 
  provisioner "file" {
    source      = "ops_config.yaml"
    destination = "/tmp/config.yaml"
  }
  provisioner "shell" {
    scripts = [
      "ops.sh"
    ]
  }
  #-------------------------------------# 

}
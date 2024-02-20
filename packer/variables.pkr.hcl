variable "project_id" {
  description = "Project ID"
  type        = string
  default     = "dev-csye6225-414718"
}

variable "region" {
  type        = string
  default = "us-east1"
}

variable "source_image_family" {
  type        = string
  default = "centos-stream-8"
}

variable "image_name" {
  type        = string
  default = "centosstream8"
}

variable "zone" {
  type        = string
  default = "us-east1-b"
}

variable "ssh_username" {
  description = "SSH username for connecting to the instance"
  type        = string
  default     = "packer"
}

variable "cred_path" {
  type        = string
  default     = "/Users/shabinasingh/Downloads/Academics/NetworkStructures/WS/dev-csye6225-414718-c278b8e91f22.json"
}
# variable "postgresql_version" {
#   default     = "postgresql-server"
# }

provider "aws" {
  region = "eu-west-1"
}

resource "aws_cognito_user_pool" "pool" {
  name = "dnd_user_pool"

  password_policy {
    minimum_length    = 6
    require_uppercase = true
  }
}

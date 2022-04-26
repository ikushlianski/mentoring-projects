resource "aws_cognito_user_pool" "pool" {
  name                     = "dnd_user_pool"
  auto_verified_attributes = ["email"]

  password_policy {
    minimum_length    = 6
    require_uppercase = true
  }
}

resource "aws_cognito_user_group" "members" {
  name         = "dnd_members"
  user_pool_id = aws_cognito_user_pool.pool.id
}

resource "aws_cognito_user_group" "admins" {
  name         = "dnd_admins"
  user_pool_id = aws_cognito_user_pool.pool.id
}

resource "aws_cognito_user" "default" {
  user_pool_id = aws_cognito_user_pool.pool.id
  username     = var.COGNITO_DEFAULT_USER_NAME
  password     = var.COGNITO_DEFAULT_USER_PASSWORD

  attributes = {
    email          = var.COGNITO_DEFAULT_USER_EMAIL
    email_verified = true
  }

  desired_delivery_mediums = ["EMAIL"]
}

resource "aws_cognito_user_in_group" "members_group_membership" {
  user_pool_id = aws_cognito_user_pool.pool.id
  group_name   = aws_cognito_user_group.members.name
  username     = aws_cognito_user.default.username
}

resource "aws_cognito_user_pool_client" "app_client" {
  name         = "dnd-auth-client"
  user_pool_id = aws_cognito_user_pool.pool.id

  allowed_oauth_flows     = ["code"]
  callback_urls           = [var.COGNITO_CALLBACK_URL]
  enable_token_revocation = true
  logout_urls             = [var.COGNITO_LOGOUT_URL]
  default_redirect_uri    = var.COGNITO_CALLBACK_URL
}

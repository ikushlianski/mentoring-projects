resource "aws_cognito_user_pool" "pool" {
  name                     = "dnd_user_pool"

  # for simplicity our backend will auto-confirm accounts
  auto_verified_attributes = []

  password_policy {
    minimum_length    = 6
    require_uppercase = true
  }
}

resource "aws_cognito_user_pool_client" "app_client" {
  name         = "dnd-auth-client"
  user_pool_id = aws_cognito_user_pool.pool.id

  allowed_oauth_flows     = ["code"]
  callback_urls           = [var.COGNITO_CALLBACK_URL]
  default_redirect_uri    = var.COGNITO_CALLBACK_URL
  enable_token_revocation = true
  explicit_auth_flows = ["USER_PASSWORD_AUTH"]
  logout_urls             = [var.COGNITO_LOGOUT_URL]
}

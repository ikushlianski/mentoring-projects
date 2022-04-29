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

resource "aws_cognito_user_group" "members" {
  name         = "dnd_members"
  user_pool_id = aws_cognito_user_pool.pool.id
}

resource "aws_cognito_user_group" "admins" {
  name         = "dnd_admins"
  user_pool_id = aws_cognito_user_pool.pool.id
}

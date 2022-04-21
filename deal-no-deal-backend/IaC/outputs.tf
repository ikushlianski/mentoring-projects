output "cognito_domain" {
  value       = aws_cognito_user_pool.pool.domain
  description = "The domain of Cognito user pool"
}

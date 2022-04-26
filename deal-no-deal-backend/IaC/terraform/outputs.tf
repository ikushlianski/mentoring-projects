output "cognito_domain" {
  value       = aws_cognito_user_pool.pool.domain
  description = "The domain of Cognito user pool"
}

output "cognito_client_id" {
  value       = aws_cognito_user_pool_client.app_client.id
  description = "The client ID"
}

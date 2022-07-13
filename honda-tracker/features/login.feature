Feature: Login
  Scenario: Successful login
    Given the user is already registered
    And the user did not log in previously
    When the user logs in with correct credentials
    Then they successfully log in

  Scenario: Wrong username
    Given the user is already registered
    When the user logs in with incorrect credentials
    Then they get a login error

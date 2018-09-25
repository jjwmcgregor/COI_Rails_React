class AuthenticateUser
  def initialize(email, password)
    @email = email
    @password = password
  end

  # Service entry point
  def call
    # puts " ======DEEB====== #{user} ============"
    JsonWebToken.encode(user_id: user.id) if user
  end

  private

  attr_reader :email, :password

  # verify user credentials
  def user
    user = User.find_by(email: email)
    # puts " ============ #{user.email} ============"
    # NOT WORKING WHEN VERIFYING HASH!!!!!
    return user if user && user.authenticate(password)
    # return user if user
    # raise Authentication error if credentials are invalid
    raise(ExceptionHandler::AuthenticationError, Message.invalid_credentials)
  end
end

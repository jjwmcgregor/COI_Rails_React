class User < ApplicationRecord
  # encrypt password
  has_secure_password

  # Validations
  validates_presence_of :first_name, :last_name, :email, :password_digest
  validates :email, uniqueness: true

end

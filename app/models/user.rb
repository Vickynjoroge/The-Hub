class User < ApplicationRecord
    has_secure_password

    validates :name, presence: true, uniqueness: true
    # validates :email, email: true
    validates :zipcode, presence: true
    validates :password, presence: true, length: {minimum: 8}
end

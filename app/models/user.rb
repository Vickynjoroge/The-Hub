class User < ApplicationRecord
    has_secure_password
    has_many :posts
    has_many :comments

    validates :password, presence: true, length: {minimum: 8}
    validates :name, presence: true, uniqueness: true

end

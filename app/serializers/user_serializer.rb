class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :username, :email, :phone_number
  
  has_one :profile
  #has_many :reviews
  has_many :posts
  has_many :comments
end

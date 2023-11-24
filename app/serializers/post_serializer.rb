class PostSerializer < ActiveModel::Serializer
  attributes :id, :category, :description, :image_url, :likes, :user_id, :created_at

  has_one :user
  has_many :comments
end


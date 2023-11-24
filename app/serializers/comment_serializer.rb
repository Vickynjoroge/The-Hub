class CommentSerializer < ActiveModel::Serializer
  attributes :id, :comment, :user_id, :post_id
  has_one :user
  belongs_to :post
end

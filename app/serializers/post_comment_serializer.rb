class PostCommentSerializer < ActiveModel::Serializer
  attributes :id
  has_one :post
  has_one :comment
end

class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :rating, :comment, :user_id, :event_id
end


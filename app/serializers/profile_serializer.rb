class ProfileSerializer < ActiveModel::Serializer
  attributes :id, :bio, :profession, :city_of_residence, :image

  belongs_to :user
end

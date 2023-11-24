class Post < ApplicationRecord
    validates :category, :description, :image_url, presence: true

    belongs_to :user
    has_many :comments
end

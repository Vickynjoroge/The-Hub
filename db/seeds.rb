puts "seeding data 🌱"
# db/seeds.rb

# Clear existing data
# Assuming you have a User model with authentication logic
Post.destroy_all
User.destroy_all


# Create users
users = []
5.times do
  users << User.create!(
    name: Faker::Name.name,
    email: Faker::Internet.email,
    password: 'password',
    premium: [true, false].sample,
    zipcode: Faker::Address.zip_code
  )
end





# Create posts
categories = %w[Category1 Category2 Category3]
descriptions = Faker::Lorem.paragraphs
image_urls = [Faker::Internet.url, Faker::Internet.url, Faker::Internet.url]

10.times do
  Post.create!(
    category: categories.sample,
    description: descriptions.sample,
    image_url: image_urls.sample,
    user: users.sample
  )
end


puts "Creating Comments"

# Seed data for the "comments" table
5.times do
  Comment.create!(
    comment: Faker::Lorem.sentence,
    user: users.sample,
    post: Post.all.sample
  )
end

# Add more users as needed
puts "done seeding data 💯"
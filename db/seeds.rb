puts "seeding data 🌱"
# db/seeds.rb

# Clear existing data
# Assuming you have a User model with authentication logic
User.destroy_all

# Create sample users with updated data
User.create!(
  name: 'Bret',
  email: 'john@example.com',
  password: '92988-3874',
  zipcode: '12345',
  premium: true
)

User.create!(
  name: 'Jane Doe',
  email: 'jane@example.com',
  password: 'password',
  zipcode: '67890',
  premium: false
)

# Add more users as needed
puts "done seeding data 💯"
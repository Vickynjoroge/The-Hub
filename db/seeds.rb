puts "seeding data 🌱"
# Clear existing data
User.destroy_all

# Create sample users
User.create!(
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password',
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

puts "done seeding data 💯"
class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :password_digest
      t.string :zipcode
      t.boolean :premium

      t.timestamps
    end
  end
end

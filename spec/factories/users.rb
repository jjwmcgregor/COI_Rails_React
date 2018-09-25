FactoryBot.define do
  factory :user do
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    email { "#{ first_name.downcase.first + last_name.downcase }@spartaglobal.com" }
    password 'Password1!'
    association :role
  end
end

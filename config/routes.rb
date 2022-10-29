Rails.application.routes.draw do
  devise_scope :user do
    get "/login", to: "devise/sessions#new"
  end
  devise_for :users
  root "home#index"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end

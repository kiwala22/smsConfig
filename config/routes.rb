# frozen_string_literal: true

Rails.application.routes.draw do
  devise_scope :user do
    match 'login' => 'users/sessions#new', via: %i[get]
    match 'sign_in' => 'users/sessions#create', via: %i[post]
  end
  devise_for :users, skip: [:registrations], controllers: {
    sessions: 'users/sessions'
  }
  root 'home#index'

  # API routes
  namespace :api do
    namespace :v2 do
      match 'check_user' => 'current_user#check_current_user', via: [:get]
      match 'home' => 'home#index', via: [:get]
    end
  end
end

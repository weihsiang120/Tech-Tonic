Rails.application.routes.draw do

  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks', registrations: "users/registrations" }
  
  resources :posts do
    resources :comments
  end
  
  get "tags/:id", to: "tags#show", as: "tag"
  put "tags/:id/follow", to: "tags#follow", as: "tag_follow"

  root to: 'home#index'
end

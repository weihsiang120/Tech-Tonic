Rails.application.routes.draw do

  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  resources :posts
  get "tags/:id", to: "tags#show", as: "tag"
  root to: 'posts#index'

end

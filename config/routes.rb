Rails.application.routes.draw do

  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks', registrations: "users/registrations" }, path_names: { edit: "/:id/edit" }
  
  resources :posts do
    resources :comments
  end
  get "users/:id/posts", to: "posts#user_posts", as: "user_posts"

  
  get "tags/:id", to: "tags#show", as: "tag"
  put "tags/:id/follow", to: "tags#follow", as: "tag_follow"

  root to: 'home#index'
end

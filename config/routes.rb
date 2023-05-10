Rails.application.routes.draw do

  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks', registrations: "users/registrations" }
  
  # path_names: { edit: "/edit" }

  post "users/check_email", to: "users#check_email"
  post "users/check_password", to: "users#check_password"

  put "users/:id/follow", to: "users#follow", as: "user_follow"
  
  resources :posts do
    resources :comments
    member do 
      put "like", to: "posts#like"
    end
  end

  # 使用者文章和標籤
  get "users/:id", to: "users#show", as: "user"
  get "users/:id/posts", to: "posts#user_posts", as: "user_posts"
  get "users/:id/tags", to: "tags#user_tags", as: "user_tags"
  get "users/:id/show", to: "users#show", as: "show_user"
  
  # 任意標籤的文章
  get "tags/:id", to: "tags#show", as: "tag"
  put "tags/:id/follow", to: "tags#follow", as: "tag_follow"

  delete "notifications/:id", to: "notifications#destroy"

  root to: 'home#index'
end

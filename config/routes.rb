Rails.application.routes.draw do

  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }

  resources :posts do
    resources :comments
    member do 
      put "like", to: "posts#like"
    end
  end
  get "tags/:id", to: "tags#show", as: "tag"
  get "tags/:id/follow", to: "tags#follow", as: "tag_follow"

  root to: 'home#index'

end

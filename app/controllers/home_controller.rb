class HomeController < ApplicationController
  def index
   @posts = Post.all.order(created_at: :desc).page(params[:page])
  end

end

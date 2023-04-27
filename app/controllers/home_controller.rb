class HomeController < ApplicationController
  def index
    require "time"
    @posts = Post.all.order(created_at: :desc).page(params[:page])
  end

end

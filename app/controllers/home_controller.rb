class HomeController < ApplicationController
  def index
    if params[:keyword].present?
      @posts = Post.published.search(params[:keyword]).order(created_at: :desc).page(params[:page])
      if @posts.empty?
        flash.now[:notice] = "No results found for '#{params[:keyword]}'"
        @posts = Post.published.order(created_at: :desc).page(params[:page])
      end
    else
      @posts = Post.published.order(created_at: :desc).page(params[:page])
    end
  end

end

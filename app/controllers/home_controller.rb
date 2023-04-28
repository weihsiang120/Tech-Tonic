class HomeController < ApplicationController
  def index
    @posts = Post.all.order(created_at: :desc).page(params[:page])
    
    if params[:keyword].present?
      @posts = @posts.search(params[:keyword]).order(created_at: :desc)
      if @posts.empty?
        flash.now[:notice] = "No results found for '#{params[:keyword]}'"
        @posts = Post.order(created_at: :desc).page(params[:page])
      end 
    end
  end

end

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

    if current_user
      # WelcomeNotification.with(user: current_user).deliver(current_user)
      @notifications = current_user.notifications.reverse
      current_user.notifications.mark_as_read!
      current_user.notifications.read.each do |notification|
        notification.destroy
      end
    end
  end

end

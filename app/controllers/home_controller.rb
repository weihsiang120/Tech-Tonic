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

    followees_new_posts_notify
    tags_new_posts_notify
  end

  private

  def followees_new_posts_notify # 回傳未解析的json字串
    if current_user
      @followees_posts_count = {}

      current_user.followees.each do |followee|
        followee_name = followee.username || followee.email
        latest_post = followee.posts.published.order(created_at: :desc).first
        
        if latest_post && latest_post.created_at > current_user.followed_users.find_by(followee_id: followee.id).updated_at
          followee_new_posts_count = followee.posts.published.where("created_at > ?", current_user.followed_users.find_by(followee_id: followee.id).updated_at).count
          # { :用戶名 || :用戶email => :新文章數量 }
          @followees_posts_count[followee_name] = followee_new_posts_count
        end
      end
      
      @followees_posts_count = @followees_posts_count.to_json
    end
  end

  def tags_new_posts_notify
    # TODO
  end

end

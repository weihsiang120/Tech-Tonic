class HomeController < ApplicationController
  def index
    
    if params[:keyword].present?
      @posts = Post.search(params[:keyword]).order(created_at: :desc).page(params[:page])
      if @posts.empty?
        flash.now[:notice] = "No results found for '#{params[:keyword]}'"
        @posts = Post.order(created_at: :desc).page(params[:page])
      end
    else
      @posts = Post.all.order(created_at: :desc).page(params[:page])
    end

    if current_user
      @followees_posts_count = {}

      current_user.followees.each do |followee|

        if followee.posts.last&.created_at && (followee.posts.last.created_at > current_user.followed_users.find_by(followee_id: followee.id).updated_at)
          
          followee_name = followee.username || followee.email
          followee_new_posts_count = followee.posts.where("created_at > ?", current_user.followed_users.find_by(followee_id: followee.id).updated_at).count
          # { :用戶email||:用戶名 => :新文章數量 }
          @followees_posts_count[followee_name] = followee_new_posts_count

        end
      end

      @followees_posts_count = @followees_posts_count.to_json
    end

  end
end

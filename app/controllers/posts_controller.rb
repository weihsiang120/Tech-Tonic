class PostsController < ApplicationController
  before_action :authenticate_user!
  before_action :find_posts, only: [:edit, :update, :show, :destroy]
  respond_to :js, :html, :json
  def index
    @posts = Post.all.order(created_at: :desc)
    if params[:keyword].present?
      @posts = Post.where('title like ? or content like ?', "%#{params[:keyword]}%", "%#{params[:keyword]}%").order(created_at: :desc)
      if @posts.empty?
      flash.now[:notice] = "No results found for '#{params[:keyword]}'"
      @posts = Post.order(created_at: :desc)
      end
    end
  end

  def new
    @post = current_user.posts.new
  end

  def create
    @post = current_user.posts.new(post_params)
    @post.add_tags(params[:tag_list])
    
    if @post.save
      render json: { success: true }, status: 200
    else
      render json: { success: false, errors: @post.errors.full_messages }, status: 422
    end
  end

  def destroy
    @post.destroy
    redirect_to posts_path, alert: "#{@post.title}已刪除"
  end

  def show
    @comments = @post.comments
  end

  def edit
    @post = current_user.posts.find(params[:id])
    @post.tag_list = @post.tags.pluck(:name).join(', ')
    # render json: @post
    # render json: @post
  end

  def update
    @post.tags.clear
    @post.add_tags(params[:tag_list])

    if @post.update(post_params)
      render json: { success: true }, status: 200
    else
      render json: { success: false, errors: @post.errors.full_messages }, status: 422
    end
  end

  def like
    @post = Post.find(params[:id])
    if current_user.voted_for? @post
      @post.unliked_by current_user
    else
      @post.liked_by current_user
    end
  end
  
  def user_posts
    @posts = Post.where(user_id: params[:id]).page(params[:page])
  end

  private

  def post_params
    params.require(:post).permit(:title, :content, :tag_list, :status)
  end

  def find_posts
    @post = Post.find(params[:id])
  end

end

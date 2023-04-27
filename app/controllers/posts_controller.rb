class PostsController < ApplicationController
  before_action :authenticate_user!
  before_action :find_posts, only: [:edit, :update, :show, :destroy]
  def index
    @posts = current_user.posts.all
  end

  def new
    @post = current_user.posts.new
  end

  def create
    @post = current_user.posts.new(post_params)
    if @post.save()
      # redirect_to root_path
      render json: { status: 'OK'}, status: 200 
      
    else
      render :new
    end
  end

  def destroy
    @post.destroy
    redirect_to posts_path, alert: "#{@post.title}已刪除"
  end

  def show
  end

  def edit
    @post = current_user.posts.find(params[:id])
    # render json: @post
    # render json: @post
  end

  def update
    
    if @post.update(post_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def post_params
    params.require(:post).permit(:title,:content, :status)
  end

  def find_posts
    @post = current_user.posts.find(params[:id])
  end
end

class PostsController < ApplicationController
  before_action :authenticate_user!
  def index
  end

  def new
    @post = current_user.posts.new
  end

  def create
    @post = current_user.posts.new(post_params)
    if @post.save()
      redirect_to root_path
    else
      render :new
    end
  end

  def destroy
  end

  def show
  end

  def edit
  end

  def update
  end

  def post_params
    params.require(:post).permit(:title,:content, :status)
  end
end

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
    @post.tags.clear
    add_tags_to_post

    if @post.update(post_params)
      render json: 200
    else
      render :edit, status: :unprocessable_entity
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

  private

  def post_params
    params.require(:post).permit(:title, :content, :tag_list, :status)
  end

  def find_posts
    @post = current_user.posts.find(params[:id])
  end

  def add_tags_to_post
    return unless params[:tag_list]

    tag_list = params[:tag_list].split(',')

    tag_list.each do |tag_name|
      tag = Tag.find_or_create_by(name: tag_name.downcase.strip.squish.gsub(/[^0-9A-Za-z]/, '_'))
      @post.tags << tag
    end
  end
end

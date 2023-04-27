class PostsController < ApplicationController
  before_action :authenticate_user!
  before_action :find_posts, only: [:edit, :update, :show, :destroy]
  
  def index
    @posts = Post.all.order(created_at: :desc).page(params[:page])
    
    if params[:keyword].present?
      @posts = @posts.search(params[:keyword]).order(created_at: :desc)
      if @posts.empty?
        flash.now[:notice] = "No results found for '#{params[:keyword]}'"
        @posts = Post.order(created_at: :desc)
      end 
    end
    # @posts = Post.where(user_id: current_user.id)
  end

  def show
    @comments = @post.comments
  end

  def new
    @post = current_user.posts.new
  end

  def create
    @post = current_user.posts.new(post_params)
    add_tags_to_post

    if @post.save
      # redirect_to root_path
      render json: { status: 'OK'}, status: 200 
      
    else
      render :new, status: :unprocessable_entity
    end
  end

  def destroy
    @post.destroy
    redirect_to posts_path, alert: "#{@post.title}已刪除"
  end

  def edit
    @post = current_user.posts.find(params[:id])
    @post.tag_list = @post.tags.pluck(:name).join(", ")
    # render json: @post
    # render json: @post
  end

  def update

    @post.tags.clear
    add_tags_to_post

    if @post.update(title: post_params[:title], content: post_params[:content], tags: @post.tags)
      render json: 200
    else
      render :edit, status: :unprocessable_entity
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
    if !post_params[:tag_list].empty?
      tag_list = post_params[:tag_list].split(",")

      tag_list.each do |tag_name|
        tag = Tag.find_or_create_by(name: tag_name.downcase.strip.squish.gsub(/[^0-9A-Za-z]/,"_"))
        @post.tags << tag
      end
    end
  end  

end

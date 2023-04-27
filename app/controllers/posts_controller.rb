class PostsController < ApplicationController

  before_action :find_post, only: %i[ show edit update destroy ]
  before_action :authenticate_user!, only: %i[ new edit create update destroy ]

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
    @post = Post.new
  end

  def edit
    if current_user.id != @post.user_id
      redirect_to root_path, alert: "你不是原作者，無權編輯！"
    end

    @post.tag_list = @post.tags.pluck(:name).join(", ")
  end

  def create
    
    set_post_title
    @post = Post.new(title: @title, content: @content, user_id: current_user.id)
    add_tags_to_post

    if @post.save
      redirect_to posts_url, notice: "Post was successfully created."
    else
      render :new, status: :unprocessable_entity
    end
  end

  def update

    @post.tags.clear
    set_post_title
    add_tags_to_post

    if @post.update(title: @title, content: @content, tags: @post.tags)
      redirect_to posts_url, notice: "Post was successfully updated."
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @post.destroy

      redirect_to posts_url, notice: "Post was successfully destroyed."
  end

  private

  def find_post
    @post = Post.find(params[:id])
  end

  def post_params
    params.require(:post).permit(:content, :tag_list, :status)
  end

  def set_post_title
    @title = ""

    @content = post_params[:content]
    lines = @content.split("\n")

    lines.each do |line|
      if line.start_with? "# "
        @title = line.sub("# ", "")
        break
      end
    end

    if @title.empty?
      @title = lines[0]
    end
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

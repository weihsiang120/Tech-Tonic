class PostsController < ApplicationController

  before_action :set_post, only: %i[ show edit update destroy ]
  before_action :authenticate_user!, only: %i[ new edit create update destroy ]
  # GET /posts or /posts.json
  def index
    @posts = Post.all.order(created_at: :desc)
    # @posts = Post.where(user_id: current_user.id)
  end

  # GET /posts/1 or /posts/1.json
  def show
  end

  # GET /posts/new
  def new
    @post = Post.new
  end

  # GET /posts/1/edit
  def edit
    if current_user.id != @post.user_id
      redirect_to root_path, alert: "你不是原作者，無權編輯！"
    end
  end

  # POST /posts or /posts.json
  def create
    # content = post_params[:text]
    # lines = content.split("\n")

    # title = ""
    # lines.each do |line|
    #   if line.start_with? "# "
    #     title = line.sub("# ", "")
    #   end
    # end

    # if title == ""
    #   title = lines[0]
    # end
    parse_text_into_title_and_content
    @post = Post.new(title: @title, content: @content, user_id: current_user.id)
    add_tags_to_post

    respond_to do |format|
      if @post.save
        format.html { redirect_to posts_url, notice: "Post was successfully created." }
      else
        format.html { render :new, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /posts/1 or /posts/1.json
  def update

    parse_text_into_title_and_content

    respond_to do |format|
      if @post.update(post_params)
        format.html { redirect_to posts_url, notice: "Post was successfully updated." }
      else
        format.html { render :edit, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /posts/1 or /posts/1.json
  def destroy
    @post.destroy

    respond_to do |format|
      format.html { redirect_to posts_url, notice: "Post was successfully destroyed." }
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_post
    @post = Post.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def post_params
    params.require(:post).permit(:text, :tag_list)
  end

  def parse_text_into_title_and_content
    @title = ""

    @content = post_params[:text]
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
      tag_list = post_params[:tag_list]
      tag_list = tag_list.split(", ")

      tag_list.each do |tag_name|
        tag = Tag.find_or_create_by(name: tag_name.downcase)
        @post.tags << tag
      end
    end
  end  
  
end

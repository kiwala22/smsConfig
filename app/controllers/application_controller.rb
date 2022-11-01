# frozen_string_literal: true

# Main App controller
class ApplicationController < ActionController::Base
  before_action :set_current_user

  private

  def set_current_user
    current_user && return if user_signed_in?
  end
end

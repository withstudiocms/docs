@echo off
echo Setting up Git Submodules

call git submodule init
call git submodule update

echo Setup Complete!
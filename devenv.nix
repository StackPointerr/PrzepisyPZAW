{ pkgs, lib, config, inputs, ... }:

{
  packages = with pkgs; [ git mongodb-compass ];

  languages.javascript.enable = true;
  languages.javascript.npm.enable = true;

  services.mongodb.enable = true;

  enterShell = ''
  '';
}
